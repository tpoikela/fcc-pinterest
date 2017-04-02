# TODO list for the pinterest clone

List of user features to implement:

  1. [X] A user can login using Twitter account.
  2. [X] A user can view their profile page.
  3. [X] A user can add images to their profile.
  4. [ ] A user can create a new board for their images.
  5. [ ] A user can specify a board as private/public.
  5. [ ] A user can add images to their board.
  6. [ ] A user can delete images from their profile.
  7. [ ] A user can can see walls of other users.
  8. [ ] Anonymous user can see walls of other users.
  9. [ ] A user can link to images posted by other users.
  11. [ ] A user can search the boards created by others.

## Database schemas

  1. User-schema
    - addedImages
    - linkedImages
    - likedImages
    - username and password
    - boards
  2. Image-schema
    - URL
    - addedBy, linkedBy, likedBy
    - Title

## Client-Server API

1. /users
    - GET returns user data for a user logged in
    - POST update user data for a user logged in

2. /images
    - GET returns all posted images
    - POST creates a new image for a logged-in user
    - PUT updates an image resource (liked/linked)

3. /boards
    - GET all public boards

## User stories to complete

  1. [X] User Story: As an unauthenticated user, I can login with Twitter.
  2. [ ] User Story: As an authenticated user, I can link to images.
  3. [ ] User Story: As an authenticated user, I can delete images that I've
      linked to.
  4. [ ] User Story: As an authenticated user, I can see a Pinterest-style wall
      of all the images I've linked to.
  5. [ ] User Story: As an unauthenticated user, I can browse other users' walls
      of images.
  6. [ ] User Story: As an authenticated user, if I upload an image that is
      broken, it will be replaced by a placeholder image.
