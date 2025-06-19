package com.billingsystems.demo.service;

import com.billingsystems.demo.model.InvoiceItem;
import com.billingsystems.demo.model.Product;
import com.billingsystems.demo.repository.InvoiceItemRepository;
import com.billingsystems.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceItemService {
    @Autowired
    private InvoiceItemRepository invoiceItemRepository;

    @Autowired
    private ProductRepository productRepository;

    public InvoiceItem processInvoiceItem(InvoiceItem invoiceItem) {
        if (invoiceItem.getProduct() == null || invoiceItem.getProduct().getId() == null) {
            throw new IllegalArgumentException("Product information is missing.");
        }

        Product product = productRepository.findById(invoiceItem.getProduct().getId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + invoiceItem.getProduct().getId()));

        invoiceItem.setProduct(product);
        invoiceItem.setPricePerUnit(product.getPrice());
        invoiceItem.calculateTotalPrice();

        return invoiceItem;
    }

    public List<InvoiceItem> getAllInvoiceItems() {
        return invoiceItemRepository.findAll();
    }

    public InvoiceItem getInvoiceItemById(Long id) {
        return invoiceItemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("InvoiceItem not found with ID: " + id));
    }
}
