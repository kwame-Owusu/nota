package main

import (
	"encoding/json"
	"github.com/kwame-Owusu/nota/internal/storage"
	"net/http"
)

type application struct {
	config config
	notes  *storage.NoteStore
}

func (app *application) mount() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /health", app.healthHandler)
	mux.HandleFunc("GET /", app.getAllNotesHandler)

	return mux
}

func (app *application) healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"status":"ok"}`))
}

func (app *application) getAllNotesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	notes, err := app.notes.FindAll(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Marshal notes to JSON
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(notes); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

type config struct {
	addr string
}
