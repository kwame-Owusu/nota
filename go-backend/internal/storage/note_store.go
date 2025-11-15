package storage

import (
	"context"
	"fmt"

	"github.com/kwame-Owusu/nota/internal/models"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type NoteStore struct {
	col *mongo.Collection
}

func NewNoteStore(db *mongo.Database) *NoteStore {
	return &NoteStore{
		col: db.Collection("notes"),
	}
}

func (s *NoteStore) Insert(ctx context.Context, note *models.Note) error {
	// TODO: implement insert logic
	return nil
}

func (s *NoteStore) FindAll(ctx context.Context) ([]models.Note, error) {
	var notes []models.Note
	cursor, err := s.col.Find(ctx, bson.D{})
	if err != nil {
		return nil, fmt.Errorf("failed to find notes: %w", err)
	}
	defer cursor.Close(ctx)

	// Decode all documents from cursor into notes slice
	if err = cursor.All(ctx, &notes); err != nil {
		return nil, fmt.Errorf("failed to decode notes: %w", err)
	}

	return notes, nil
}

func (s *NoteStore) FindByID(ctx context.Context, id string) (*models.Note, error) {
	// TODO: implement findByID logic
	return nil, nil
}

func (s *NoteStore) Update(ctx context.Context, id string, note *models.Note) error {
	// TODO: implement update logic
	return nil
}

func (s *NoteStore) Delete(ctx context.Context, id string) error {
	// TODO: implement delete logic
	return nil
}
