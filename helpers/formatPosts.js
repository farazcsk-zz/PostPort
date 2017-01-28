const formatPosts = (posts) => {
  let formattedPosts = [];
  posts.forEach((post) => {
    if (formatPost(post)) {
      formattedPosts = [
        ...formattedPosts,
        post,
      ];
    }
  });
  return formattedPosts;
};

const formatPost = (post) => {
  if (post.location !== null) {
    console.log(post.location);
    return true;
  }

  return false;
};

export default formatPosts;
