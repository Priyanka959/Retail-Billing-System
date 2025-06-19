package com.billingsystems.demo.service;

import com.billingsystems.demo.model.Customer;
import com.billingsystems.demo.model.Invoice;
import com.billingsystems.demo.model.InvoiceItem;
import com.billingsystems.demo.model.Product;
import com.billingsystems.demo.repository.CustomerRepository;
import com.billingsystems.demo.repository.InvoiceRepository;
import com.billingsystems.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    @Lazy
    private ProductRepository productRepository;

    public Invoice saveInvoice(Invoice invoice) {
        // Ensure the customer exists
        if (invoice.getCustomer() != null && invoice.getCustomer().getId() != null) {
            Customer customer = customerRepository.findById(invoice.getCustomer().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Customer not found with ID: " + invoice.getCustomer().getId()));
            invoice.setCustomer(customer);
        }

        // Validate invoice items (must not be empty)
        if (invoice.getItems() == null || invoice.getItems().isEmpty()) {
            throw new IllegalArgumentException("Invoice must contain at least one item.");
        }

        // Ensure each product exists and set price per unit
        for (InvoiceItem item : invoice.getItems()) {
            if (item.getProduct() == null || item.getProduct().getId() == null) {
                throw new IllegalArgumentException("Product information is missing.");
            }
            Product product = productRepository.findById(item.getProduct().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + item.getProduct().getId()));
            
            item.setProduct(product);
            item.setPricePerUnit(product.getPrice());
            item.calculateTotalPrice();
            item.setInvoice(invoice); // Link item to invoice
        }

        // Set invoice date if not provided
        if (invoice.getDate() == null) {
            invoice.setDate(LocalDate.now());
        }

        // Calculate the total invoice price, including GST
        invoice.calculateTotalPrice(0.18); // Example GST rate: 18%

        // Save the invoice
        return invoiceRepository.save(invoice);
    }
    public List<Invoice> getAllInvoices() {
      List<Invoice> invoices = invoiceRepository.findAll();
      
      invoices.forEach(invoice -> {
          invoice.setCustomer(invoice.getCustomer()); // 🔥 Forces loading before serialization
      });
  
      return invoices;
  }
  
  
  
    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invoice not found with ID: " + id));
    }
}
