# Backend setup (Supabase)

The website stores its content, enquiries, job applications and bookings in
Supabase. The browser never talks to Supabase. Every read and write goes
through the site's own server code in `src/server`, using a secret key.

## One-time setup

1. **Create the tables.** In Supabase open **SQL Editor > New query**, paste
   the whole of `supabase/schema.sql` and press **Run**.
2. **Load the starting content.** New query, paste the whole of
   `supabase/seed.sql`, **Run**.
3. **Add the keys to Vercel.** Project > Settings > Environment Variables.
   Add each of these for Production, Preview and Development:

   | Name | Where to find it |
   | --- | --- |
   | `SUPABASE_URL` | Supabase > Project Settings > Data API > Project URL |
   | `SUPABASE_SECRET_KEY` | Supabase > Project Settings > API Keys > Secret key (`sb_secret_...`). On older projects, the `service_role` key. |
   | `REVALIDATE_SECRET` | Any long random string you make up. Keep a copy for step 5. |
   | `NEXT_PUBLIC_SITE_URL` | `https://appssolutionstech.com` |

4. **Redeploy** on Vercel (Deployments > latest > Redeploy), then open
   `https://appssolutionstech.com/api/health`. It should say
   `"database": "connected"` with a row count for each table.
5. **Make edits appear at once.** In Supabase open **Database > Webhooks >
   Create a new hook**. Create one hook for each of these tables: `services`,
   `industries`, `case_studies`, `jobs`, `consultation_types`.
   - Events: Insert, Update, Delete
   - Type: HTTP Request, method `POST`
   - URL: `https://appssolutionstech.com/api/revalidate`
   - HTTP header: name `x-revalidate-secret`, value: your `REVALIDATE_SECRET`

   Without the webhooks, edits still appear on their own within an hour.

For local work, copy `.env.example` to `.env.local` and fill in the same values.

## Day-to-day use (Supabase > Table Editor)

| Task | What to do |
| --- | --- |
| Edit a service, industry, case study or role | Change the row. With the webhook, the site updates in seconds. |
| Add one | Insert a row. `slug` becomes the page address, e.g. `/careers/<slug>`. |
| Hide one without deleting it | Set `published` to `false`. |
| Change the order | Lower `position` shows first. |
| Read enquiries | `contact_messages` table. |
| Read job applications | `job_applications` table. The résumé is in **Storage > resumes** at the row's `resume_path`. |
| See bookings | `bookings` table. Times are stored in UTC. |
| Cancel a booking and free the time | Set its `status` to `cancelled`. |
| Block a holiday or a busy afternoon | Insert a row in `availability_blocks` with `starts_at` and `ends_at`. |

Office hours for bookings (Monday to Friday, 9:00 to 17:00 Toronto time,
30 minute steps, 24 hours' notice, 60 days ahead) are set at the top of
`src/lib/scheduling.ts`.

## How it fits together

```
Browser
  |  pages (static HTML, refreshed when content changes)
  |  forms  -> server actions      src/server/actions/*.ts
  |  calendar -> GET /api/availability
  v
Next.js server on Vercel
  src/server/content.ts    cached reads of content tables
  src/server/bookings.ts   booked and blocked time
  src/server/guard.ts      input cleaning, rate limiting
  src/server/supabase.ts   the one database client (secret key)
  v
Supabase: Postgres tables + private "resumes" storage bucket
  ^
  Database webhook -> POST /api/revalidate (refreshes the cache)
```

- **If the database is unreachable**, pages fall back to the content bundled
  in `src/content`, so the site never goes blank. Forms report an error
  rather than pretending to succeed.
- **Double booking is impossible.** A database constraint refuses any
  confirmed booking that overlaps another, even when two people submit at
  the same instant.
- **Security.** Row level security is on for every table. The public key can
  read published content only. Enquiries, applications, bookings and résumés
  are reachable only with the secret key, which lives only on the server.

## Regenerating the seed file

`supabase/seed.sql` is generated from `src/content`. After changing those
files run `npm run db:seed-file`. Running the seed in Supabase again never
overwrites rows that already exist.

## Admin panel

The admin panel is at `/admin`. From it you can read and manage enquiries,
bookings and job applications (including résumé downloads), block time on
the booking calendar, and create, edit, hide or delete every service,
industry, case study, open role and session type. Changes to content appear
on the website at once.

**Give someone access**

1. Supabase > **Authentication > Users > Add user**. Enter their email and a
   strong password and tick **Auto Confirm User**.
2. Supabase > **SQL Editor**, run (with their email):

   ```sql
   insert into public.admin_users (user_id)
   select id from auth.users where email = 'you@example.com';
   ```

They can now sign in at `/admin`. Having a Supabase user alone is not enough:
only users listed in `admin_users` get in.

**Remove access:** delete their row from `admin_users` (Table Editor). It
takes effect on their next click.

**Change a password:** Supabase > Authentication > Users > the user > Send
password recovery, or delete and re-add the user.

**Recommended:** Supabase > Authentication > Sign In / Providers > turn off
"Allow new users to sign up". Nobody needs to sign up on this site.

Sessions last 12 hours. The session cookie is signed with a key derived from
`SUPABASE_SECRET_KEY`, so rotating that key signs every admin out.
