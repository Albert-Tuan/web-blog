using WebBlog.Api.Models;

namespace WebBlog.Api.Data;

public static class SeedPosts
{
    public static Post[] All =>
    [
        new Post { Id = 1, Title = "Ngày đầu tiên với React.js", Excerpt = "Hôm nay tôi bắt đầu hành trình học React. Component, JSX, state... bao nhiêu thứ mới lạ!", Author = "Albert Tuan",
            Content = "\n      <p>Hôm nay là ngày đầu tiên tôi bắt đầu học React.js, và tôi đã học được rất nhiều thứ!</p>\n      \n      <h3>1. Component là gì?</h3>\n      <p>Component là một khối UI có thể tái sử dụng. Giống như một \"viên gạch\" để xây dựng giao diện. Mỗi component có thể chứa logic riêng và giao diện riêng.</p>\n      \n      <h3>2. JSX - Kết hợp JS và HTML</h3>\n      <p>JSX cho phép chúng ta viết HTML trong JavaScript. Trông có vẻ lạ lúc đầu, nhưng sau đó tôi nhận ra nó rất tiện lợi!</p>\n      \n      <h3>3. State và Props</h3>\n      <p>State là dữ liệu nội bộ của component, còn Props là dữ liệu được truyền vào từ bên ngoài. Hiểu được sự khác nhau này là chìa khóa để học React.</p>\n      \n      <h3>Kết luận</h3>\n      <p>Ngày đầu tiên với React khá thú vị. Tôi đã tạo được component đầu tiên và hiểu được cách React quản lý giao diện. Looking forward to learning more!</p>\n    ",
            PublishedAt = new DateTime(2024, 10, 15, 0, 0, 0, DateTimeKind.Utc), Tags = ["React", "JavaScript", "Cơ bản"] },
        new Post { Id = 2, Title = "CSS Flexbox không khó như bạn nghĩ", Excerpt = "Sau nhiều ngày vật lộn với float và grid, cuối cùng tôi cũng hiểu Flexbox rồi! Chia sẻ cách tôi học nó.", Author = "Albert Tuan",
            Content = "<p>Nội dung chi tiết về Flexbox...</p>",
            PublishedAt = new DateTime(2024, 10, 18, 0, 0, 0, DateTimeKind.Utc), Tags = ["CSS", "Flexbox", "Layout"] },
        new Post { Id = 3, Title = "Git & GitHub cho người mới bắt đầu", Excerpt = "Commit, push, pull, merge... Tưởng khó hoá ra dễ! Ghi chú lại những lệnh Git cơ bản tôi hay dùng.", Author = "Albert Tuan",
            Content = "<p>Nội dung chi tiết về Git...</p>",
            PublishedAt = new DateTime(2024, 10, 22, 0, 0, 0, DateTimeKind.Utc), Tags = ["Git", "GitHub", "Version Control"] },
        new Post { Id = 4, Title = "Tự xây blog cá nhân với React", Excerpt = "Để ôn lại kiến thức, tôi quyết định làm một blog cá nhân. Và đây là nhật ký hành trình!", Author = "Albert Tuan",
            Content = "<p>Nội dung chi tiết về project blog...</p>",
            PublishedAt = new DateTime(2024, 10, 25, 0, 0, 0, DateTimeKind.Utc), Tags = ["Project", "React", "Blog"] },
        new Post { Id = 5, Title = "Học JavaScript qua 5 trò chơi nhỏ", Excerpt = "Không có gì thú vị hơn việc học code qua game! Giới thiệu 5 trang web giúp học JS một cách vui vẻ.", Author = "Albert Tuan",
            Content = "<p>Nội dung chi tiết về games...</p>",
            PublishedAt = new DateTime(2024, 10, 28, 0, 0, 0, DateTimeKind.Utc), Tags = ["JavaScript", "Game", "Học tập"] },
        new Post { Id = 6, Title = "Async/Await là gì vậy?", Excerpt = "Callback, Promise, Async/Await - trời ơi sao JavaScript có nhiều cách xử lý bất đồng bộ thế!", Author = "Albert Tuan",
            Content = "<p>Nội dung chi tiết về Async/Await...</p>",
            PublishedAt = new DateTime(2024, 11, 1, 0, 0, 0, DateTimeKind.Utc), Tags = ["JavaScript", "Async", "Nâng cao"] },
        new Post { Id = 7, Title = "Tìm hiểu về API và RESTful", Excerpt = "GET, POST, PUT, DELETE - những HTTP methods cơ bản mà developer nào cũng cần biết.", Author = "Albert Tuan",
            Content = "<p>Nội dung chi tiết về API...</p>",
            PublishedAt = new DateTime(2024, 11, 5, 0, 0, 0, DateTimeKind.Utc), Tags = ["API", "REST", "Backend"] },
        new Post { Id = 8, Title = "5 VS Code extensions giúp tôi code nhanh hơn", Excerpt = "Những extension không thể thiếu cho React developer: Prettier, ESLint, Auto Rename Tag...", Author = "Albert Tuan",
            Content = "<p>Nội dung chi tiết về VS Code extensions...</p>",
            PublishedAt = new DateTime(2024, 11, 10, 0, 0, 0, DateTimeKind.Utc), Tags = ["VS Code", "Tools", "Productivity"] },
    ];
}
