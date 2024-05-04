using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeaponsClassLibrary.Migrations
{
    /// <inheritdoc />
    public partial class ChangedMinValueName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentPrice",
                table: "UserQueries");

            migrationBuilder.RenameColumn(
                name: "MinValue",
                table: "UserQueries",
                newName: "MinPrice");

            migrationBuilder.AddColumn<double>(
                name: "CurrentPrice",
                table: "Weapons",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentPrice",
                table: "Weapons");

            migrationBuilder.RenameColumn(
                name: "MinPrice",
                table: "UserQueries",
                newName: "MinValue");

            migrationBuilder.AddColumn<int>(
                name: "CurrentPrice",
                table: "UserQueries",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
