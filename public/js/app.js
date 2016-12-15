if ('serviceWorker' in navigator) {
 navigator.serviceWorker
          .register('./service-worker.js')
          .then(function() { console.log('Service Worker Registered'); });
}

app={}
app.init=function(){
  app.showOnlineFlag();
  app.loadPosts();
}
app.showOnlineFlag=function(){
  $online_flag=document.querySelector(".online-flag");
  if(navigator.onLine) {
    $online_flag.style.display="none";
  }else{
    $online_flag.style.display="block";
  }
}
app.showPosts=function(data){
  $posts=document.querySelector(".posts");
  posts=[]
  for(index in data){
    post=data[index]
    posts.push('<div class="post"><h5>'+post.title+'</h5><p>'+post.body+'</p></div>')
  }
  $posts.innerHTML=posts.join("")
}
app.loadPosts=function(){
  url="http://localhost:8000/api/posts"
  //first, check in cache. Then, ask to network
  console.log("cache?")
  if ('caches' in window) {
    console.log("CACHES")
    /*
     * Check if the service worker has already cached this city's weather
     * data. If the service worker has the data, then display the cached
     * data while the app fetches the latest data.
     */
    caches.match(url).then(function(response) {
      console.log("match cache")
      if (response) {
        response.json().then(function(data){
          app.showPosts(data.data);
        });
      }
    });
  }
  fetch(url)
    .then(
      function(response) {
        response.json().then(function(data) {
          app.showPosts(data.data)
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}
