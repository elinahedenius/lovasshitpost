  class Post{
  constructor(title, content){
    this.title = title;
    this.content = content;
  }
}

function addNewPost(title, content){
  var newPost = new Post(title, content);

  var postTitle =  document.createElement('h1');
  postTitle.innerHTML = title;

  var postContent = document.createElement('p');
  postContent.innerHTML = content;

  var contentContainer = document.createElement('div');
  contentContainer.style.height = 'auto';
  contentContainer.style.width = '500px';
  contentContainer.style.backgroundColor = 'white';
  contentContainer.style.fontFamily = 'sans-serif';
  contentContainer.style.padding = '5px';

  var postBody = document.createElement('div');
  postBody.style.display = 'flex';
  postBody.style.justifyContent = 'center';
  postBody.style.alignItems = 'center';
  postBody.style.height = 'auto';
  postBody.style.maxWidth = '600px';
  postBody.style.backgroundColor = 'white';
  postBody.style.margin = '10px';
  postBody.style.boxShadow = '3px 3px 8px rgba(0, 0, 0, .5)'
  postBody.style.borderRadius = '4px'
  postBody.class = 'posts';

  contentContainer.appendChild(postTitle);
  contentContainer.appendChild(postContent);
  postBody.appendChild(contentContainer);

  document.body.appendChild(postBody);
}

function loadPostsToPage(res){
  for(x in res){
    var y = (res[x]);
    addNewPost(y.title, y.content);
  }
}

function hidePosts(){
  $('.posts').hide()
}
