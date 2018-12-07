CREATE TABLE "location" (
	"id" SERIAL PRIMARY KEY,
	"coordinates" POINT, 
	"created" TIMESTAMP DEFAULT NOW()
);