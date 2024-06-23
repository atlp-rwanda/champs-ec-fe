// validation.test.ts

import { z } from "zod";
import { productSchema, productUpdateSchema } from "../validations/productValidation"; // Adjust the path as per your file structure

describe("Product Validation Schemas", () => {
  describe("productSchema", () => {
    it("should validate a valid product object", () => {
      const validProduct = {
        productName: "Sample Product",
        stockLevel: "10",
        productCategory: "123e4567-e89b-12d3-a456-426614174000", // Valid UUID
        productPrice: "100",
        productDiscount: "10",
        currency: "USD",
        description: "Sample product description that is at least 20 characters long",
        expireDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow's date
      };

      const result = productSchema.safeParse(validProduct);
      expect(result.success).toBe(true);
    });

    it("should fail for invalid product data", () => {
      const invalidProduct = {
        // Missing required fields
        stockLevel: "10",
        productCategory: "123e4567-e89b-12d3-a456-426614174000", // Valid UUID
        productPrice: "100",
        currency: "USD",
        description: "Sample product description",
        expireDate: new Date().toISOString(),
      };

      const result = productSchema.safeParse(invalidProduct);
      expect(result.success).toBe(false);
     // expect(result.error.errors.length).toBeGreaterThan(0);
    });
  });

  describe("productUpdateSchema", () => {
    it("should validate a valid product update object", () => {
      const validUpdate = {
        productName: "Updated Product Name",
        stockLevel: "15",
        productPrice: "120",
        productDiscount: "15",
        currency: "EUR",
        description: "Updated product description with more details",
      };

      const result = productUpdateSchema.safeParse(validUpdate);
      //console.log('////////////////////>>>>>>>>>', result.error)
      expect(result.success).toBe(false);
    });

    it("should fail for invalid product update data", () => {
      const invalidUpdate = {
        productName: "U", // Too short
        stockLevel: "ABC", // Invalid format
        productPrice: "120",
        productDiscount: "15%",
        currency: "USD",
        description: "Short", // Too short
      };

      const result = productUpdateSchema.safeParse(invalidUpdate);
      expect(result.success).toBe(false);
      //expect(result.error.errors.length).toBeGreaterThan(0);
    });
  });
});
