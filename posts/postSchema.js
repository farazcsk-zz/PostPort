import { schema } from 'normalizr';

const postSchema = new schema.Entity('posts');
const postListSchema = [postSchema];
const placeSchema = new schema.Entity('places');

postSchema.define({
  place: placeSchema,
});

export { postListSchema };
