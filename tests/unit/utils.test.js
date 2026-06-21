import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Control Panel Utilities', () => {
  beforeEach(() => {
    // Load the file content and evaluate it in the JSDOM context
    let code = fs.readFileSync(path.resolve(__dirname, '../../js/control-panel.js'), 'utf-8');
    
    // We only need to eval the top part or the whole file, but evaling the whole file might throw if DOM elements are missing.
    // Instead of evaling the whole file, let's mock document before evaling.
    window.document.body.innerHTML = '<div id="particlesBg"></div>';
    
    // Polyfill BroadcastChannel for JSDOM
    if (!window.BroadcastChannel) {
      window.BroadcastChannel = class BroadcastChannel {
        postMessage() {}
        close() {}
      };
    }
    
    // Expose functions to window
    code += `
      window.convertArabicDigitsToWestern = convertArabicDigitsToWestern;
      window.getHijriDate = getHijriDate;
    `;
    
    eval(code);
  });

  describe('convertArabicDigitsToWestern', () => {
    it('should convert Arabic numerals to Western numerals', () => {
      // Act
      const result = window.convertArabicDigitsToWestern('١٢٣٤٥٦٧٨٩٠');
      
      // Assert
      expect(result).toBe('1234567890');
    });

    it('should handle mixed strings', () => {
      // Act
      const result = window.convertArabicDigitsToWestern('عام ١٤٤٥');
      
      // Assert
      expect(result).toBe('عام 1445');
    });

    it('should return the original string if no Arabic numerals are present', () => {
      // Act
      const result = window.convertArabicDigitsToWestern('Hello 123');
      
      // Assert
      expect(result).toBe('Hello 123');
    });
  });

  describe('getHijriDate', () => {
    it('should return a formatted Hijri date string', () => {
      // Act
      const result = window.getHijriDate();
      
      // Assert
      expect(result).toBeDefined();
      expect(result).toContain('هـ'); // Should end or contain the Hijri indicator
      // Ensure digits are western, not arabic
      expect(result).not.toMatch(/[٠-٩]/);
    });
  });
});
