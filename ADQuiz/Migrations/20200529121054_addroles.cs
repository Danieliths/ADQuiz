using Microsoft.EntityFrameworkCore.Migrations;

namespace ADQuiz.Migrations
{
    public partial class addroles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "48b0e661-4530-465b-aaa7-2d1f610929a1", "8dad6e17-154a-497e-98ab-496692fb8955", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "314ceb8d-901e-46e2-af96-6a44e75ff05a", "6b9b7cb2-9878-4d2c-b6fa-e31417c74257", "Administrator", "ADMINISTRATOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "314ceb8d-901e-46e2-af96-6a44e75ff05a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "48b0e661-4530-465b-aaa7-2d1f610929a1");
        }
    }
}
