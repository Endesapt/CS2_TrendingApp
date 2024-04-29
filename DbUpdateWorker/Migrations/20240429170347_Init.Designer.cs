﻿// <auto-generated />
using System;
using DbUpdateWorker.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DbUpdateWorker.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240429170347_Init")]
    partial class Init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("WeaponsClassLibrary.Weapon", b =>
                {
                    b.Property<long>("ClassId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("ClassId"));

                    b.Property<string>("IconUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Type")
                        .HasColumnType("text");

                    b.HasKey("ClassId");

                    b.ToTable("Weapons");
                });

            modelBuilder.Entity("WeaponsClassLibrary.WeaponPrice", b =>
                {
                    b.Property<long>("WeaponClassId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("PriceTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<double>("Price")
                        .HasColumnType("double precision");

                    b.HasKey("WeaponClassId", "PriceTime");

                    b.ToTable("WeaponsPrices");
                });

            modelBuilder.Entity("WeaponsClassLibrary.WeaponPrice", b =>
                {
                    b.HasOne("WeaponsClassLibrary.Weapon", "Weapon")
                        .WithMany()
                        .HasForeignKey("WeaponClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Weapon");
                });
#pragma warning restore 612, 618
        }
    }
}
