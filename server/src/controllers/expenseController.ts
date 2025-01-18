import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Grabbing our expenses data in categories from our seedData. 
export const getExpensesByCategory = async(
   req: Request,
   res: Response
): Promise<void> =>{
   try{
      //Ordering all expenses
      const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
         {
            orderBy: {
               date: "desc",
            },
         }
      );
      //mapping all expenses into strings
      const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
         (item) => ({
            ...item,
            amount: item.amount.toString() 
         })
      );

      res.json(expenseByCategorySummary);
   }catch (error){
      res.status(500).json({message: "Error retrieving expenses by category"});
      } 
}