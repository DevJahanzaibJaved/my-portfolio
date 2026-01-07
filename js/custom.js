
  (function ($) {
  
  "use strict";

    // PRE LOADER
    $(window).load(function(){
      $('.preloader').fadeOut(1000); // set duration in brackets    
    });

    // CUSTOM LINK
    $('.custom-link').click(function(){
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height() + 10;

    scrollToDiv(elWrapped,header_height);
    return false;

    function scrollToDiv(element,navheight){
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop-navheight;

      $('body,html').animate({
      scrollTop: totalScroll
      }, 300);
  }
});

    // SCROLL-TRIGGERED ANIMATIONS
    function initScrollAnimations() {
      // Check if IntersectionObserver is supported
      if ('IntersectionObserver' in window) {
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        };

        // Main observer for animate-on-scroll elements - triggers on every scroll
        const observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('animated');
            } else {
              // Remove animated class when element leaves viewport to retrigger animation
              entry.target.classList.remove('animated');
            }
          });
        }, observerOptions);

        // Observe elements with animate-on-scroll class
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(function(el) {
          observer.observe(el);
        });

        // Services thumbnails observer - triggers on every scroll
        const servicesObserver = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('animated');
            } else {
              entry.target.classList.remove('animated');
            }
          });
        }, observerOptions);

        // Observe services thumbnails with staggered delays
        const servicesThumbs = document.querySelectorAll('.services-thumb');
        servicesThumbs.forEach(function(el, index) {
          // Staggered delay for better visual effect
          el.style.animationDelay = (index * 0.15) + 's';
          servicesObserver.observe(el);
        });

        // Projects thumbnails observer - triggers on every scroll
        const projectsObserver = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('animated');
            } else {
              entry.target.classList.remove('animated');
            }
          });
        }, observerOptions);

        // Observe projects thumbnails with simple staggered delays
        const projectsThumbs = document.querySelectorAll('.projects-thumb');
        projectsThumbs.forEach(function(el, index) {
          // Simple staggered delay for smooth sequential appearance
          el.style.transitionDelay = (index * 0.1) + 's';
          projectsObserver.observe(el);
        });

        // Testimonials cards observer - triggers on every scroll
        const testimonialsObserver = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('animated');
            } else {
              entry.target.classList.remove('animated');
            }
          });
        }, observerOptions);

        // Observe testimonials cards with staggered delays
        const testimonialCards = document.querySelectorAll('.testimonials .card');
        testimonialCards.forEach(function(el, index) {
          // Simple staggered delay for smooth sequential appearance
          el.style.transitionDelay = (index * 0.15) + 's';
          testimonialsObserver.observe(el);
        });

        // Client images observer - triggers on every scroll
        const clientsObserver = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('animated');
            } else {
              entry.target.classList.remove('animated');
            }
          });
        }, observerOptions);

        // Observe client images
        const clientImages = document.querySelectorAll('.clients-image');
        clientImages.forEach(function(el, index) {
          el.style.animationDelay = (index * 0.1) + 's';
          clientsObserver.observe(el);
        });

        // Featured numbers observer - triggers on every scroll
        const featuredObserver = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('animated');
            } else {
              entry.target.classList.remove('animated');
            }
          });
        }, observerOptions);

        // Observe featured numbers
        const featuredNumbers = document.querySelectorAll('.featured-numbers');
        featuredNumbers.forEach(function(el, index) {
          el.style.animationDelay = (index * 0.15) + 's';
          featuredObserver.observe(el);
        });
      } else {
        // Fallback for browsers without IntersectionObserver
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(function(el) {
          el.classList.add('animated');
        });
      }
    }

    // Initialize animations when DOM is ready
    $(document).ready(function() {
      initScrollAnimations();
    });

    // Re-initialize on window load
    $(window).on('load', function() {
      initScrollAnimations();
    });

    // Add hover effects to buttons
    $('.custom-btn').hover(
      function() {
        $(this).addClass('pulse-animation');
      },
      function() {
        $(this).removeClass('pulse-animation');
      }
    );

    // Animate numbers on scroll - retriggers every time section is visible
    function animateNumbers() {
      $('.featured-numbers').each(function() {
        const $this = $(this);
        const countTo = $this.attr('data-count');
        const currentText = $this.text().trim();
        
        // Extract number from text (handles "5+", "84", etc.)
        const currentNum = parseInt(currentText.replace(/\D/g, '')) || 0;
        const targetNum = parseInt(countTo) || 0;
        
        if (targetNum > 0) {
          // Remove counted class to allow re-animation
          $this.removeClass('counted');
          const suffix = currentText.replace(/\d/g, ''); // Get "+" or other suffix
          
          // Reset to 0 for animation
          $this.text('0' + suffix);
          
          $({ countNum: 0 }).animate({
            countNum: targetNum
          }, {
            duration: 2000,
            easing: 'swing',
            step: function() {
              $this.text(Math.floor(this.countNum) + suffix);
            },
            complete: function() {
              $this.text(targetNum + suffix);
              $this.addClass('counted');
            }
          });
        }
      });
    }

    // Trigger number animation when featured section is visible - retriggers on every scroll
    if ('IntersectionObserver' in window) {
      const featuredNumbersObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            // Reset numbers and animate again
            $('.featured-numbers').removeClass('counted');
            animateNumbers();
          }
        });
      }, { threshold: 0.5 });

      const featuredSection = document.querySelector('.featured');
      if (featuredSection) {
        featuredNumbersObserver.observe(featuredSection);
      }
    } else {
      // Fallback: animate immediately
      $(window).on('load', function() {
        animateNumbers();
      });
    }

    // Contact Form Submission Handler
    $('#contact-form').on('submit', function(e) {
      const $form = $(this);
      const $submitBtn = $('#submit-btn');
      const $messageDiv = $('#form-message');
      const originalBtnText = $submitBtn.text();
      
      // Validate form before submission
      let isValid = true;
      const requiredFields = $form.find('[required]');
      
      requiredFields.each(function() {
        const $field = $(this);
        if (!$field.val().trim()) {
          isValid = false;
          $field.addClass('is-invalid');
        } else {
          $field.removeClass('is-invalid');
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        $messageDiv.html('<div class="alert alert-danger" role="alert" style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #EF4444; padding: 15px; border-radius: 10px;"><strong>Error!</strong> Please fill in all required fields.</div>').fadeIn();
        return false;
      }
      
      // Disable submit button and show loading state
      $submitBtn.prop('disabled', true).text('Sending...');
      $messageDiv.hide();
      
      // FormSubmit.co will handle the submission and redirect
      // The form will submit normally, and FormSubmit will redirect to _next URL
      // If we want to show a message before redirect, we can do it here
      // But since FormSubmit redirects, the message will be shown on the redirect page
    });
    
    // Handle form validation on input
    $('#contact-form input, #contact-form textarea').on('input blur', function() {
      const $field = $(this);
      if ($field.attr('required') && !$field.val().trim()) {
        $field.addClass('is-invalid');
      } else {
        $field.removeClass('is-invalid');
      }
    });
    
  })(window.jQuery);


