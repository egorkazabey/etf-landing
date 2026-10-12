-- Kontakty z formuláře. Spuštění: npm run db:migrate (bezpečné opakovat).
-- Uchováváme jen to, co je v zásadách (public/soukromi.html), nejdéle do 31. 12. 2026.
create table if not exists leads (
  id            bigint generated always as identity primary key,
  email         text        not null unique,          -- malými písmeny
  consent       boolean     not null check (consent), -- bez souhlasu se nic neukládá
  consent_text  text        not null,                 -- znění souhlasu, jak ho návštěvník viděl
  consent_at    timestamptz not null default now(),   -- čas posledního udělení souhlasu
  created_at    timestamptz not null default now(),
  submissions   integer     not null default 1,       -- kolikrát formulář odeslal
  ad            text        check (ad in ('a', 'b')), -- verze hlavičky stránky
  monthly       integer,                              -- částka v kalkulačce při odeslání
  years         integer,                              -- počet let v kalkulačce při odeslání
  utm_source    text,                                 -- utm_* z prvního odeslání (první dotyk)
  utm_medium    text,
  utm_campaign  text,
  utm_content   text
);
