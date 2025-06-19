package com.billingsystems.demo.controller;

import com.billingsystems.demo.model.Invoice;
import com.billingsystems.demo.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/invoices") // 🔥 Use plural form for RESTful API convention
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    // ✅ CREATE Invoice
    @PostMapping
    public ResponseEntity<Invoice> saveInvoice(@RequestBody Invoice invoice) {
        return ResponseEntity.ok(invoiceService.saveInvoice(invoice));
    }

    // ✅ FETCH ALL Invoices (Handles Empty Case)
    @GetMapping
    public ResponseEntity<?> getAllInvoices() {
        List<Invoice> invoices = invoiceService.getAllInvoices();
        
        if (invoices.isEmpty()) {
            return ResponseEntity.status(404).body("No invoices found in the database.");
        }
        
        return ResponseEntity.ok(invoices);
    }

    // ✅ FETCH Invoice by ID (Handles Missing ID)
    @GetMapping("/{id}")
    public ResponseEntity<?> getInvoiceById(@PathVariable Long id) {
        try {
            Invoice invoice = invoiceService.getInvoiceById(id);
            return ResponseEntity.ok(invoice);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("Invoice not found with ID: " + id);
        }
    }
}
