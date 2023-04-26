USE [master]
GO
/****** Object:  Database [Parkhaus]    Script Date: 26/04/2023 14:27:57 ******/
CREATE DATABASE [Parkhaus]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Parkhaus', FILENAME = N'D:\Programme\SQLServer\MSSQL16.SQLEXPRESS\MSSQL\DATA\Parkhaus.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Parkhaus_log', FILENAME = N'D:\Programme\SQLServer\MSSQL16.SQLEXPRESS\MSSQL\DATA\Parkhaus_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [Parkhaus] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Parkhaus].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Parkhaus] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Parkhaus] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Parkhaus] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Parkhaus] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Parkhaus] SET ARITHABORT OFF 
GO
ALTER DATABASE [Parkhaus] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Parkhaus] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Parkhaus] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Parkhaus] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Parkhaus] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Parkhaus] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Parkhaus] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Parkhaus] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Parkhaus] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Parkhaus] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Parkhaus] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Parkhaus] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Parkhaus] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Parkhaus] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Parkhaus] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Parkhaus] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Parkhaus] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Parkhaus] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Parkhaus] SET  MULTI_USER 
GO
ALTER DATABASE [Parkhaus] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Parkhaus] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Parkhaus] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Parkhaus] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Parkhaus] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Parkhaus] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Parkhaus] SET QUERY_STORE = ON
GO
ALTER DATABASE [Parkhaus] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Parkhaus]
GO
/****** Object:  Table [dbo].[Parkers]    Script Date: 26/04/2023 14:27:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Parkers](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Kennzeichen] [nvarchar](12) NULL,
	[Dauerparker] [bit] NULL,
	[Einfahrtdatum] [datetime] NULL,
	[Ausfahrtdatum] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ParkingLots]    Script Date: 26/04/2023 14:27:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ParkingLots](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[BelegtVon] [int] NULL,
	[ReserviertFürDauerparker] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [Parkhaus] SET  READ_WRITE 
GO
