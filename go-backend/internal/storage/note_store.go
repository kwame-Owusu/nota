package storage

import (
	"context"
	"github.com/kwame-Owusu/nota/internal/models"
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
	// TODO: implement find logic
	return nil, nil
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
