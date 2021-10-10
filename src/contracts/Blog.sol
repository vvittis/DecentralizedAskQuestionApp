pragma solidity ^0.5.4;

contract Blog {

    address owner;
    uint256 public value;
    uint256 public postCount;

    mapping(uint256 => mapping(uint256 => Comment)) public comments;
    mapping(uint256 => Post) public posts;
//    Comment [] public comments;
    /* Structs */
    struct Comment {
        address author;
        string content;

    }

    struct Post {
        uint256 id;
        string content;
        uint256 tipAmount;
        address payable author;
        uint256 numberOfComments;
    }


    constructor () public {
        owner = msg.sender;
        value = 5;
        postCount = 0;
    }

    /* Events for Monitoring */
    event PostCreated(
        uint256 id,
        string content,
        uint tipAmount,
        address payable author
    );

    event CommentAdded(
        uint256 postId,
        address author,
        string content
    );
    event PostTipped(
        uint id,
        string content,
        uint tipAmount,
        address payable author
    );

    /* Functions */

    function createPost(string memory _content) public {
        require(bytes(_content).length > 0);
        postCount++;
        Post storage post = posts[postCount];
        post.author = msg.sender;
        post.id = postCount;
        post.content = _content;
        post.tipAmount = 0;

        emit PostCreated(postCount, _content, 0, msg.sender);
    }


    function commentPost(uint256 _postId, string memory _content) public {
        require(bytes(_content).length > 0);

        Post storage _commentedPost = posts[_postId];
        _commentedPost.numberOfComments++;

        comments[_postId][_commentedPost.numberOfComments] = Comment({
        author : msg.sender,
        content : _content
        });
        emit CommentAdded(_postId, msg.sender, _content);
    }


        function tipPost(uint256 _postId) public payable {
            require(msg.value > 0);
            Post storage _tippedPost = posts[_postId];
            _tippedPost.tipAmount += msg.value;
            address payable author = _tippedPost.author;
            address(author).transfer(msg.value);
            emit PostTipped(_tippedPost.id, _tippedPost.content, _tippedPost.tipAmount, _tippedPost.author);
        }


}