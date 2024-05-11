using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeaponsClassLibrary.Migrations
{
    /// <inheritdoc />
    public partial class CurrentPriceIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Weapons_CurrentPrice",
                table: "Weapons",
                column: "CurrentPrice");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Weapons_CurrentPrice",
                table: "Weapons");
        }
    }
}
