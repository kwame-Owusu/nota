package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"

	"github.com/kwame-Owusu/nota/internal/storage"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found")
	}

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("Set your 'PORT' environment variable.")
	}

	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		log.Fatal("Set your 'MONGO_URI' environment variable.")
	}

	// CONNECT TO MONGO
	client, err := mongo.Connect(options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatalf("Mongo connection error: %v", err)
	}

	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Fatal(err)
		}
	}()

	db := client.Database("notes_db")

	// Create NoteStore
	noteStore := storage.NewNoteStore(db)

	cfg := config{
		addr: fmt.Sprintf(":%v", port),
	}

	app := application{
		config: cfg,
		notes:  noteStore,
	}

	fmt.Printf("Server running on http://localhost%v\n", cfg.addr)
	http.ListenAndServe(cfg.addr, app.mount())
}
