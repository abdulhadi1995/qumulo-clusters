
## Qumulo Cluster Management

## Getting Started

This repo has 2 separate code bases, one for Adonis js inside the `api` directory 
and another for Next.js inside the `web` directory. 

In the API folder copy the `.env.example` file in a new `.env` file and set
`APP_KEY=y9w_OQRfnEXtFF3N2dXTUZG9Hk82b4WC`

For web the API url is set already in next.config.mjs. 

Open 2 terminals then on 1 

```bash
cd api

#install dependencies
npm i 

#run backend
node ace serve --hmr
```
Adonis js will be running on [http://localhost:3333](http://localhost:3000)

on the other terminal : 

```bash
cd web

#install dependencies
npm i 

#run web
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## What is done 

- UI to show iops and throughputs data from API using Rechart.
- Ability to fetch and update Snapshot policy. 
- Some level of responsiveness to make it usable. 

## Nice to have but not done 

- Using DB (would make query and aggregation of data easier then JS arrays).
- Validation on the form. (this is a big one and must have for production readiness)
- Filtering by time range.

