package storage

import (
	"context"
	"fmt"
	"github.com/kwame-Owusu/nota/internal/models"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"time"
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
	// Set timestamps
	now := time.Now()
	note.CreatedAt = now
	note.UpdatedAt = now

	// Insert the note (MongoDB will generate _id automatically)
	result, err := s.col.InsertOne(ctx, note)
	if err != nil {
		return fmt.Errorf("failed to insert note: %w", err)
	}

	// Set the generated ID back to the note struct
	if oid, ok := result.InsertedID.(bson.ObjectID); ok {
		note.ID = oid
	}

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
	// Convert string ID to bson.ObjectID
	objectID, err := bson.ObjectIDFromHex(id)
	if err != nil {
		return nil, fmt.Errorf("invalid ID format: %w", err)
	}

	var note models.Note

	err = s.col.FindOne(ctx, bson.M{"_id": objectID}).Decode(&note)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, fmt.Errorf("note not found")
		}
		return nil, fmt.Errorf("failed to find note: %w", err)
	}

	return &note, nil
}

func (s *NoteStore) Update(ctx context.Context, id string, note *models.Note) error {
	objectID, err := bson.ObjectIDFromHex(id)
	if err != nil {
		return fmt.Errorf("invalid ID format: %w", err)
	}
	now := time.Now()
	note.UpdatedAt = now

	update := bson.M{
		"$set": bson.M{
			"title":     note.Title,
			"content":   note.Content,
			"updatedAt": note.UpdatedAt,
		},
	}

	result := s.col.FindOneAndUpdate(ctx, bson.M{"_id": objectID}, update)
	if err := result.Err(); err != nil {
		if err == mongo.ErrNoDocuments {
			return fmt.Errorf("note not found")
		}
		return fmt.Errorf("failed to update note: %w", err)
	}

	return nil
}

func (s *NoteStore) Delete(ctx context.Context, id string) error {
	objectID, err := bson.ObjectIDFromHex(id)
	if err != nil {
		return fmt.Errorf("invalid ID format: %w", err)
	}

	result, err := s.col.DeleteOne(ctx, bson.M{"_id": objectID})
	if err != nil {
		return fmt.Errorf("failed to delete note: %w", err)
	}

	if result.DeletedCount == 0 {
		return fmt.Errorf("note not found")
	}

	return nil
}
