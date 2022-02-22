;; <Main page implementation>

;; constants


;; data maps and vars

;; for registration
(define-map reg { id: principal } { national-id: uint, dob: (string-ascii 10), ss: uint })

;; for entering property information
(define-map prop-info {id: principal} {token-uri: (string-ascii 64)})

;; for entering property/house details
(define-map house-details {id: principal} {token-uri: (string-ascii 64)})



;; ;; private functions
;; (define-private (aut-check (id principal) ()) 
;;     (let 
;;         (value-given (get national-id (map-get? reg {id: tx-sender})))
;;         (value-given (get national-id (map-get? reg {id: tx-sender})))
;;     )
;; )

;; public functions
;; for registering new user
(define-public (reg-user (national-id uint) (dob (string-ascii 10)) (ss uint))
    (ok (map-insert reg { id: tx-sender } { national-id: national-id, dob: dob, ss: ss }))
)

;; adding property information details
(define-public (add-prop-info (token-uri (string-ascii 64)))
    (ok (map-insert prop-info { id: tx-sender } {token-uri: token-uri}))
)

;; adding details 
(define-public (add-details (token-uri (string-ascii 64)))
    (ok (map-insert house-details {id: tx-sender} {token-uri: token-uri}))
)


;; read-only functions
(define-read-only (is-new-user)
    (is-none (map-get? reg {id: tx-sender}))
)

(define-read-only (get-national-id)
    (get national-id (map-get? reg {id: tx-sender}))
)

(define-read-only (get-dob) 
    (get dob (map-get? reg {id: tx-sender}))
)

(define-read-only (get-ss) 
    (get ss (map-get? reg {id: tx-sender}))
)

(define-read-only (get-prop-info-uri) 
    (get token-uri (map-get? prop-info {id: tx-sender}))
)

(define-read-only (get-details-uri) 
    (get token-uri (map-get? house-details {id: tx-sender}))
)