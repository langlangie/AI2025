-- SQL schema for users and webview_modules tables based on ERD.md
CREATE DATABASE igate;

CREATE USER igate WITH PASSWORD 'SomePassw0rd123!';

GRANT ALL PRIVILEGES ON DATABASE igate TO igate;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL
);

CREATE TABLE public.webview_modules (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	url varchar(500) NOT NULL,
	menuname varchar(255) NOT NULL,
	submenuname varchar(255) NOT NULL,
	integrationstatus varchar(100) NOT NULL,
	eligibilitystatus varchar(100) NOT NULL,
	activestatus bool NOT NULL,
	username varchar(255) NOT NULL,
	CONSTRAINT webview_modules_pkey PRIMARY KEY (id)
);

CREATE TABLE public.webview_modules_eligible (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    modules_id uuid NOT NULL REFERENCES public.webview_modules(id) ON DELETE CASCADE,
    eligibleData jsonb NOT NULL
);
