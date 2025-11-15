package main

import (
	"github.com/kwame-Owusu/nota/internal/storage"
	"net/http"
)

type application struct {
	config config
	notes  *storage.NoteStore
}

func (app *application) mount() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/health", app.healthHandler)

	return mux
}

func (app *application) healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"status":"ok"}`))
}

type config struct {
	addr string
}
