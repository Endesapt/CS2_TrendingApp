﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using WeaponsClassLibrary.Data;

#nullable disable

namespace WeaponsClassLibrary.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240504113206_addLastPrice")]
    partial class addLastPrice
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("WeaponsClassLibrary.UserQuery", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("CurrentPrice")
                        .HasColumnType("integer");

                    b.Property<int>("MaxPrice")
                        .HasColumnType("integer");

                    b.Property<int>("MinValue")
                        .HasColumnType("integer");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.Property<long>("WeaponClassId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("WeaponClassId");

                    b.ToTable("UserQueries");
                });

            modelBuilder.Entity("WeaponsClassLibrary.Weapon", b =>
                {
                    b.Property<long>("ClassId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("ClassId"));

                    b.Property<string>("IconUrl")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.Property<string>("Type")
                        .HasMaxLength(32)
                        .HasColumnType("character varying(32)");

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

            modelBuilder.Entity("WeaponsClassLibrary.UserQuery", b =>
                {
                    b.HasOne("WeaponsClassLibrary.Weapon", "Weapon")
                        .WithMany()
                        .HasForeignKey("WeaponClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Weapon");
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
