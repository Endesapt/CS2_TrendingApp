using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DbUpdateWorker.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Weapons",
                columns: table => new
                {
                    ClassId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IconUrl = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Weapons", x => x.ClassId);
                });

            migrationBuilder.CreateTable(
                name: "WeaponsPrices",
                columns: table => new
                {
                    WeaponClassId = table.Column<long>(type: "bigint", nullable: false),
                    PriceTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeaponsPrices", x => new { x.WeaponClassId, x.PriceTime });
                    table.ForeignKey(
                        name: "FK_WeaponsPrices_Weapons_WeaponClassId",
                        column: x => x.WeaponClassId,
                        principalTable: "Weapons",
                        principalColumn: "ClassId",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WeaponsPrices");

            migrationBuilder.DropTable(
                name: "Weapons");
        }
    }
}
