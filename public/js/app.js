class Post extends HTMLDivElement{
  constructor(title, content){
    super();

    this.title = title;
    this.content = content;
  }

}

body.customElements.define('post-element', class extends HTMLDivElement{});
