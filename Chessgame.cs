using System;

namespace ChessGame
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Welcome to Chess!");

            // Initialize the chess board
            ChessBoard board = new ChessBoard();

            // Print the board
            board.Print();

            // Game loop
            while (!board.IsGameOver())
            {
                // Get the current player's move
                Console.Write($"{board.CurrentPlayer}'s move: ");
                string move = Console.ReadLine();

                // Make the move
                if (board.MakeMove(move))
                {
                    // Print the board
                    board.Print();
                }
                else
                {
                    Console.WriteLine("Invalid move!");
                }
            }

            // Print the winner
            Console.WriteLine($"Game over! {board.Winner} wins!");
        }
    }

    public class ChessBoard
    {
        // The chess board is an 8x8 grid of squares
        private readonly ChessPiece[,] squares = new ChessPiece[8, 8];

        // The current player (White or Black)
        public ChessColor CurrentPlayer { get; private set; } = ChessColor.White;

        // The winner (White or Black) or null if the game is not over
        public ChessColor Winner { get; private set; } = null;

        public ChessBoard()
        {
            // Initialize the board with starting positions for the pieces
            squares[0, 0] = new ChessPiece(ChessColor.White, ChessPieceType.Rook);
            squares[0, 1] = new ChessPiece(ChessColor.White, ChessPieceType.Knight);
            squares[0, 2] = new ChessPiece(ChessColor.White, ChessPieceType.Bishop);
            squares[0, 3] = new ChessPiece(ChessColor.White, ChessPieceType.Queen);
            squares[0, 4] = new ChessPiece(ChessColor.White, ChessPieceType.King);
            squares[0, 5] = new ChessPiece(ChessColor.White, ChessPieceType.Bishop);
            squares[0, 6] = new ChessPiece(ChessColor.White, ChessPieceType.Knight);
            squares[0, 7] = new ChessPiece(ChessColor.White, ChessPieceType.Rook);

            squares[1, 0] = new ChessPiece(ChessColor.White, ChessPieceType.Pawn);
            squares[1, 1] = new ChessPiece(ChessColor.White, ChessPieceType.Pawn);
            squares[1, 2] = new ChessPiece(ChessColor.White, ChessPieceType.Pawn);
            squares[1, 3] = new ChessPiece(ChessColor.White, ChessPieceType.Pawn);
            squares[1, 4] = new ChessPiece(ChessColor.White, ChessPieceType.Pawn);
            squares[1, 5] = new ChessPiece(ChessColor.White, ChessPieceType.Pawn);
            squares[1, 6] = new ChessPiece(ChessColor.White, ChessPieceType.Pawn);
            squares[1, 7] = new ChessPiece(ChessColor.White, ChessPieceType.Pawn);

            squares[7, 0] = new ChessPiece(ChessColor.Black, ChessPieceType.Rook);
            squares[7, 1] = new ChessPiece(ChessColor.Black, ChessPieceType.Knight);
            squares[7, 2] = new ChessPiece(ChessColor.Black, ChessPieceType.Bishop);
            squares[7, 3] = new ChessPiece(ChessColor.Black, ChessPieceType.Queen
