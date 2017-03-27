# TODO list for the pinterest clone

  1. [ ] A user can login using Twitter account.
  2. [ ] A user can view their profile page.
  3. [ ] A user can add images to their profile.
  4. [ ] A user can delete images from their profile.
  5. [ ] A user can can see walls of other users.
  6. [ ] Anonymous user can see walls of other users.
  7. [ ] A user can link to images posted by other users.

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

## User stories to complete

  1. [ ] User Story: As an unauthenticated user, I can login with Twitter.
  2. [ ] User Story: As an authenticated user, I can link to images.
  3. [ ] User Story: As an authenticated user, I can delete images that I've
      linked to.
  4. [ ] User Story: As an authenticated user, I can see a Pinterest-style wall
      of all the images I've linked to.
  5. [ ] User Story: As an unauthenticated user, I can browse other users' walls
      of images.
  6. [ ] User Story: As an authenticated user, if I upload an image that is
      broken, it will be replaced by a placeholder image.
