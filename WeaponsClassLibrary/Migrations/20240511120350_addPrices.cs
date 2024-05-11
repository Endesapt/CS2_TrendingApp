using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeaponsClassLibrary.Migrations
{
    /// <inheritdoc />
    public partial class addPrices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "MonthPrice",
                table: "Weapons",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "WeekPrice",
                table: "Weapons",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MonthPrice",
                table: "Weapons");

            migrationBuilder.DropColumn(
                name: "WeekPrice",
                table: "Weapons");
        }
    }
}
