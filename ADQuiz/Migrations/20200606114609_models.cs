using Microsoft.EntityFrameworkCore.Migrations;

namespace ADQuiz.Migrations
{
    public partial class models : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_Questions_QuestionId",
                table: "Answers");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "050ee462-899f-48c1-922a-24a537871c95");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9c825216-a8a2-4d88-ab98-904bc36ffcca");

            migrationBuilder.DropColumn(
                name: "CorrectAnswerId",
                table: "Questions");

            migrationBuilder.AddColumn<string>(
                name: "CorrectAnswer",
                table: "Questions",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "e4ab9a63-ba2e-40a4-9d46-a2461a64bc83", "3ca83aa3-328c-4d7d-a1bf-ca96b867bd9d", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "93e6dab4-9462-4332-a07d-9a8554285edc", "1272f244-277f-471e-969c-d39b6661fa06", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_Questions_QuestionId",
                table: "Answers",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_Questions_QuestionId",
                table: "Answers");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "93e6dab4-9462-4332-a07d-9a8554285edc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e4ab9a63-ba2e-40a4-9d46-a2461a64bc83");

            migrationBuilder.DropColumn(
                name: "CorrectAnswer",
                table: "Questions");

            migrationBuilder.AddColumn<string>(
                name: "CorrectAnswerId",
                table: "Questions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "050ee462-899f-48c1-922a-24a537871c95", "3d69fa6f-20ff-47d6-9dde-c7acb1ad32fd", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "9c825216-a8a2-4d88-ab98-904bc36ffcca", "2694142f-6c9f-43f1-b8ba-3911fb716408", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_Questions_QuestionId",
                table: "Answers",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
