using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AngularApi.Migrations
{
    /// <inheritdoc />
    public partial class AddUserToWishItmes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "WishItems",
                type: "nvarchar(450)",
                nullable: true);

          

            migrationBuilder.CreateIndex(
                name: "IX_WishItems_UserId",
                table: "WishItems",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_WishItems_AspNetUsers_UserId",
                table: "WishItems",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishItems_AspNetUsers_UserId",
                table: "WishItems");

            migrationBuilder.DropIndex(
                name: "IX_WishItems_UserId",
                table: "WishItems");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "WishItems");                               
        }
    }
}
