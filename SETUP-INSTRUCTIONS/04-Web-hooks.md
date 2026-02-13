- In Clerk Dashboard | Configure | under Developers | select Webhooks
- select "Add Endpoint", and enter Endpoint URL
- In Convex docs, https://docs.convex.dev/functions/http-actions
copy the URL: https://{your deployment name}.convex.site, paste this as Endpoint URL, with /clerk at the end
- Endpoint URL: https://{your deployment name}.convex.site/clerk
- get "deployment name" in /.env.local, get text after CONVEX_DEPLOYMENT=dev:, in CONVEX_DEPLOYMENT=dev:ideal-warthog-671, ie: ideal-warthog-671
- Endpoint URL: https://ideal-warthog-671.convex.site/clerk
- select following events: session.created, session.ended, user.created, user.updated
- click "Create"
- next, copy the Signing Secret, Paste in Convex Dashboard | Settings | Environment Variables, create
Environment Variable, select "Add", Name: CLERK_WEBHOOK_SECRET, Value: "paste Signing Secret here"

- create 2 files, under /convex: /convex/http.ts and /convex/clerk.ts
- npm install svix
- npm install @clerk/clerk-sdk-node
- create another environmental variable, Name: CLERK_APP_DOMAIN, Value: https://singular-snapper-82.clerk.accounts.dev
    - get above "Value" from Clerk Dashboard | Configure | under Developers | select Domains, copy the domain name, example: singular-snapper-82.clerk.accounts.dev
    and paste along with "https://"
- update schema.ts, delete files: products.ts and tasks.ts created for tutorial
- create /convex/users.ts
- Note(Convex Problem): isOnline Field is not updated to false in the Convex Database's => users Table, Upon SignOut through App