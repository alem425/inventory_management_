import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Grabbing our dashboard metrics from prisma. 
export const getDashboardMetrics = async(
   req: Request,
   res: Response
): Promise<void> =>{
   try{
      /* Taking the top 15 products from our json metadata files 
      and ordering by their stock quantity in descending order. */
      const popularProducts = await prisma.products.findMany({
         take: 15,
         orderBy: {
            stockQuantity: "desc",
         },
      });

      /**
       * Taking 5 of each type of summaries from our prisma schema and 
       * ordering by date in descending order.
       */
      const salesSummary = await prisma.salesSummary.findMany({
         take: 5,
         orderBy: {
            date: "desc",
         },
      });

      const purchaseSummary = await prisma.purchaseSummary.findMany({
         take: 5,
         orderBy: {
            date: "desc",
         },
      });

      const expenseSummary = await prisma.expenseSummary.findMany({
         take: 5,
         orderBy: {
            date: "desc",
         },
      });
      /**
       * Doing the same as the others, but this will not be sent back to the front end.
       */
      const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
         take: 5,
         orderBy: {
            date: "desc",
         },
      });

      
      /**
       * This will be what will be returned back to the 
       * front-end since strings will be needed.
       */
      const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
         (item) => ({
            ...item,
            amount:item.amount.toString(),
         })
      );

      res.json({
         popularProducts,
         salesSummary,
         purchaseSummary,
         expenseSummary,
         expenseByCategorySummary,
      })
   }catch (error){
      res.status(500).json({message: "Error retrieving dashboard metrics"});
   }
};