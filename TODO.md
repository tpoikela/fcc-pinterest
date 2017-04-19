# TODO list for the pinterest clone

List of user features to implement:

  1. [X] A user can login using Twitter account.
  2. [X] A user can view their profile page.
  3. [X] A user can add images to their wall.
  4. [X] A user can unlink images from their wall.
  5. [X] A user can can see walls of other users.
  6. [X] Anonymous user can see walls of other users.
  7. [X] A user can link to images posted by other users.
  8. [ ] A user can search the walls created by others.
  9. [ ] When a broken URL is used, a special image is shown.

## Database schemas

  1. User-schema
    - addedImages
    - linkedImages
    - likedImages
    - username and password
  2. Image-schema
    - URL
    - addedBy, linkedBy, likedBy
    - Title

## Client-Server API

  1. /users
    - GET returns user data for a user logged in
    - POST update user data for a user logged in
    - /list
        - GET /list to retrieve a list of all usernames

  2. /images
    - GET returns all posted images
    - POST creates a new image for a logged-in user
    - PUT updates an image resource (liked/linked)
    - DELETE update an image resource (unliked/unlinked)

## User stories to complete

  1. [X] User Story: As an unauthenticated user, I can login with Twitter.
  2. [X] User Story: As an authenticated user, I can link to images.
  3. [X] User Story: As an authenticated user, I can delete images that I've
      linked to.
  4. [X] User Story: As an authenticated user, I can see a Pinterest-style wall
      of all the images I've linked to.
  5. [ ] User Story: As an unauthenticated user, I can browse other users' walls
      of images.
  6. [ ] User Story: As an authenticated user, if I upload an image that is
      broken, it will be replaced by a placeholder image.
