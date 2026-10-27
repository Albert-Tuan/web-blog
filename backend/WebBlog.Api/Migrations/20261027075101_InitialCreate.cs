using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebBlog.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Excerpt = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    Content = table.Column<string>(type: "TEXT", maxLength: 100000, nullable: false),
                    Author = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    PublishedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Tags = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "Author", "Content", "Excerpt", "PublishedAt", "Tags", "Title" },
                values: new object[,]
                {
                    { 1, "Albert Tuan", "\n      <p>Hôm nay là ngày đầu tiên tôi bắt đầu học React.js, và tôi đã học được rất nhiều thứ!</p>\n      \n      <h3>1. Component là gì?</h3>\n      <p>Component là một khối UI có thể tái sử dụng. Giống như một \"viên gạch\" để xây dựng giao diện. Mỗi component có thể chứa logic riêng và giao diện riêng.</p>\n      \n      <h3>2. JSX - Kết hợp JS và HTML</h3>\n      <p>JSX cho phép chúng ta viết HTML trong JavaScript. Trông có vẻ lạ lúc đầu, nhưng sau đó tôi nhận ra nó rất tiện lợi!</p>\n      \n      <h3>3. State và Props</h3>\n      <p>State là dữ liệu nội bộ của component, còn Props là dữ liệu được truyền vào từ bên ngoài. Hiểu được sự khác nhau này là chìa khóa để học React.</p>\n      \n      <h3>Kết luận</h3>\n      <p>Ngày đầu tiên với React khá thú vị. Tôi đã tạo được component đầu tiên và hiểu được cách React quản lý giao diện. Looking forward to learning more!</p>\n    ", "Hôm nay tôi bắt đầu hành trình học React. Component, JSX, state... bao nhiêu thứ mới lạ!", new DateTime(2024, 10, 15, 0, 0, 0, 0, DateTimeKind.Utc), "[\"React\",\"JavaScript\",\"C\\u01A1 b\\u1EA3n\"]", "Ngày đầu tiên với React.js" },
                    { 2, "Albert Tuan", "<p>Nội dung chi tiết về Flexbox...</p>", "Sau nhiều ngày vật lộn với float và grid, cuối cùng tôi cũng hiểu Flexbox rồi! Chia sẻ cách tôi học nó.", new DateTime(2024, 10, 18, 0, 0, 0, 0, DateTimeKind.Utc), "[\"CSS\",\"Flexbox\",\"Layout\"]", "CSS Flexbox không khó như bạn nghĩ" },
                    { 3, "Albert Tuan", "<p>Nội dung chi tiết về Git...</p>", "Commit, push, pull, merge... Tưởng khó hoá ra dễ! Ghi chú lại những lệnh Git cơ bản tôi hay dùng.", new DateTime(2024, 10, 22, 0, 0, 0, 0, DateTimeKind.Utc), "[\"Git\",\"GitHub\",\"Version Control\"]", "Git & GitHub cho người mới bắt đầu" },
                    { 4, "Albert Tuan", "<p>Nội dung chi tiết về project blog...</p>", "Để ôn lại kiến thức, tôi quyết định làm một blog cá nhân. Và đây là nhật ký hành trình!", new DateTime(2024, 10, 25, 0, 0, 0, 0, DateTimeKind.Utc), "[\"Project\",\"React\",\"Blog\"]", "Tự xây blog cá nhân với React" },
                    { 5, "Albert Tuan", "<p>Nội dung chi tiết về games...</p>", "Không có gì thú vị hơn việc học code qua game! Giới thiệu 5 trang web giúp học JS một cách vui vẻ.", new DateTime(2024, 10, 28, 0, 0, 0, 0, DateTimeKind.Utc), "[\"JavaScript\",\"Game\",\"H\\u1ECDc t\\u1EADp\"]", "Học JavaScript qua 5 trò chơi nhỏ" },
                    { 6, "Albert Tuan", "<p>Nội dung chi tiết về Async/Await...</p>", "Callback, Promise, Async/Await - trời ơi sao JavaScript có nhiều cách xử lý bất đồng bộ thế!", new DateTime(2024, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc), "[\"JavaScript\",\"Async\",\"N\\u00E2ng cao\"]", "Async/Await là gì vậy?" },
                    { 7, "Albert Tuan", "<p>Nội dung chi tiết về API...</p>", "GET, POST, PUT, DELETE - những HTTP methods cơ bản mà developer nào cũng cần biết.", new DateTime(2024, 11, 5, 0, 0, 0, 0, DateTimeKind.Utc), "[\"API\",\"REST\",\"Backend\"]", "Tìm hiểu về API và RESTful" },
                    { 8, "Albert Tuan", "<p>Nội dung chi tiết về VS Code extensions...</p>", "Những extension không thể thiếu cho React developer: Prettier, ESLint, Auto Rename Tag...", new DateTime(2024, 11, 10, 0, 0, 0, 0, DateTimeKind.Utc), "[\"VS Code\",\"Tools\",\"Productivity\"]", "5 VS Code extensions giúp tôi code nhanh hơn" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Posts_PublishedAt",
                table: "Posts",
                column: "PublishedAt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Posts");
        }
    }
}
