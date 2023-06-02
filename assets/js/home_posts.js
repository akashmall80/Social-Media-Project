{
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                //convert form to json
                data:newPostForm.serialize(),
                success:function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    let newPostDom = function(post){
        return $(`
            <li id="post-${post._id}">
                <p>
                ${post.content}
                ${post.user.name}
                    <!--delete sign will be shown to user to there post-->
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">x</a>
                 </p>
            
                <div class="post-comment">
                    
                    <form action="/comments/create" method="post">
                        <input type="text" name="content" id="" placeholder="comment" required>
                        <!--sending post id -->
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit">
                    </form>
                    
                    <div class="post-comments-list">
                      
                    </div>
                    </div>
            </li>
           `)
    }

    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                //get the value of href
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove()
                },error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    createPost();
}