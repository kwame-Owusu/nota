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

	clientBaseURL := os.Getenv("CLIENT_BASE_URL")
	if clientBaseURL == "" {
		log.Fatal("Set your 'CLIENT_BASE_URL' environment variable.")
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
	handler := corsMiddleware(clientBaseURL)(app.mount())

	fmt.Printf("Server running on http://localhost%v\n", cfg.addr)
	http.ListenAndServe(cfg.addr, handler)
}

func corsMiddleware(allowedOrigin string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			w.Header().Set("Access-Control-Allow-Credentials", "true")

			// Handle preflight requests
			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}
