import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Lower Third Controller', () => {
  let ltInstance;

  beforeEach(() => {
    // Setup a basic DOM structure expected by controller.js
    window.document.body.innerHTML = `
      <div id="ltWrapper" class="lower-third-wrapper lt-hidden">
        <div class="lt-name"></div>
        <div class="lt-title"></div>
        <div class="lt-location"></div>
      </div>
    `;

    // Mock BroadcastChannel
    window.BroadcastChannel = class {
      constructor(name) { this.name = name; }
      postMessage() {}
      close() {}
      addEventListener() {}
    };

    // Load and evaluate controller.js
    const code = fs.readFileSync(path.resolve(__dirname, '../../js/controller.js'), 'utf-8');
    eval(code);

    // controller.js auto-instantiates as window.LT
    ltInstance = window.LT;
    
    // Initialize to bind DOM elements
    ltInstance.init();
  });

  afterEach(() => {
    // Clean up
    if (ltInstance && ltInstance.channel) {
      ltInstance.channel.close();
    }
  });

  describe('enter()', () => {
    it('should transition from hidden to entering state', () => {
      // Act
      ltInstance.enter();

      // Assert
      const wrapper = document.getElementById('ltWrapper');
      expect(wrapper.classList.contains('lt-hidden')).toBe(false);
      expect(wrapper.classList.contains('lt-entering')).toBe(true);
      expect(ltInstance.state).toBe('entering');
    });

    it('should set an auto-exit timeout if duration > 0', () => {
      // Arrange
      vi.useFakeTimers();
      ltInstance.duration = 5; // 5 seconds
      const exitSpy = vi.spyOn(ltInstance, 'exit');

      // Act
      ltInstance.enter();

      // Assert
      expect(exitSpy).not.toHaveBeenCalled();
      
      // Fast-forward 1400ms for enter animation + 5000ms duration
      vi.advanceTimersByTime(6400);
      expect(exitSpy).toHaveBeenCalled();
      
      vi.restoreAllMocks();
      vi.useRealTimers();
    });
  });

  describe('exit()', () => {
    it('should transition to exiting state', () => {
      // Arrange
      ltInstance.enter(); // Set to entering first
      ltInstance.state = 'visible'; // Force to visible
      
      // Act
      ltInstance.exit();

      // Assert
      const wrapper = document.getElementById('ltWrapper');
      expect(wrapper.classList.contains('lt-entering')).toBe(false);
      expect(wrapper.classList.contains('lt-exiting')).toBe(true);
      expect(ltInstance.state).toBe('exiting');
    });
  });

  describe('_handleCommand()', () => {
    it('should update properties and call _applyAll on update command', () => {
      // Arrange
      const applySpy = vi.spyOn(ltInstance, '_applyAll');
      const payload = {
        type: 'update',
        name: 'Test Name',
        title: 'Test Title'
      };

      // Act
      ltInstance._handleCommand(payload);

      // Assert
      expect(ltInstance.name).toBe('Test Name');
      expect(ltInstance.title).toBe('Test Title');
      expect(applySpy).toHaveBeenCalled();
    });

    it('should call enter on show command', () => {
      // Arrange
      const enterSpy = vi.spyOn(ltInstance, 'enter');
      const payload = { type: 'show' };

      // Act
      ltInstance._handleCommand(payload);

      // Assert
      expect(enterSpy).toHaveBeenCalled();
    });
  });
});
