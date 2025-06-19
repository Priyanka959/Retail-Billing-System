package com.billingsystems.demo.controller;

import com.billingsystems.demo.model.InvoiceItem;
import com.billingsystems.demo.service.InvoiceItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invoice-items")
public class InvoiceItemController {

    @Autowired
    private InvoiceItemService invoiceItemService;

    @PostMapping
    public ResponseEntity<InvoiceItem> processInvoiceItem(@RequestBody InvoiceItem invoiceItem) {
        return ResponseEntity.ok(invoiceItemService.processInvoiceItem(invoiceItem));
    }

    @GetMapping
    public ResponseEntity<List<InvoiceItem>> getAllInvoiceItems() {
        return ResponseEntity.ok(invoiceItemService.getAllInvoiceItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getInvoiceItemById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(invoiceItemService.getInvoiceItemById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("InvoiceItem not found with ID: " + id);
        }
    }
}
