/*
  Warnings:

  - Made the column `token` on table `User` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable

-- Add a new column 'isLoggedIn' to table 'User' in schema 'public'
-- ALTER TABLE "User"
--   ADD isLoggedIn /*new_column_name*/ BOOLEAN /*new_column_datatype*/ NOT NULL /*new_column_nullability*/

-- -- Add a new column 'NewColumnName' to table 'TableName' in schema 'SchemaName'
-- ALTER TABLE "User"
--   ADD token /*new_column_name*/ TEXT /*new_column_datatype*/ NOT NULL /*new_column_nullability*/
-- GO
