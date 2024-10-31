using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AngularApi.Migrations
{
    /// <inheritdoc />
    public partial class MakeNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishItems_ProductWithRatingDTO2_ProductId",
                table: "WishItems");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "WishItems",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_WishItems_ProductWithRatingDTO2_ProductId",
                table: "WishItems",
                column: "ProductId",
                principalTable: "ProductWithRatingDTO2",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishItems_ProductWithRatingDTO2_ProductId",
                table: "WishItems");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "WishItems",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_WishItems_ProductWithRatingDTO2_ProductId",
                table: "WishItems",
                column: "ProductId",
                principalTable: "ProductWithRatingDTO2",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
