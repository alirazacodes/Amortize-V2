;; equity-multi-claim
;; <add a description here>


;; constants
;; (define-constant call 'ST2C20XGZBAYFZ1NYNHT1J6MGMM0EW9X7PFZZEXA6.Amortize-BTC-lock-V2)

;; data maps and vars
(define-data-var v-share uint u0)
(define-data-var add-to-remove (optional principal) none)
(define-data-var beneficiaries (list 10 principal) (list))


;; private functions
;; for distributing among different beneficiaries
(define-private (distribute (beneficier principal))
    (begin
        (asserts! (is-eq (stx-transfer? (var-get v-share) tx-sender beneficier) (ok true)) false)
        true
    )
)

;; for filtering out last beneficiary(tenant) from the list
(define-private (filter-last-beneficier (beneficier principal))
    (not (is-eq (unwrap-panic (element-at (var-get beneficiaries) (- (len (var-get beneficiaries)) u1))) beneficier))
)

;; public functions
;; claiming from multiple tenants/beneficiaries
(define-public (multi-claim (id uint) (agent principal))
    (begin
        (let
            (
                (prev-balance (stx-get-balance tx-sender))
                ;; (claimed (try! (contract-call? .btc-lock claim id agent)))
                ;; (transfered (try! (contract-call? .nft-minting transfer-ownership id agent)))
                (second-last (filter filter-last-beneficier (var-get beneficiaries)))
                (total-balance (stx-get-balance tx-sender))
                (trans-balance (- total-balance prev-balance))
                (share (/ trans-balance (len (var-get beneficiaries))))
            )

            (var-set v-share share)
            (filter distribute second-last)
            ;; (try! (stx-transfer? (stx-get-balance tx-sender) tx-sender (unwrap-panic (element-at (var-get beneficiaries) (- (len (var-get beneficiaries)) u1)))))
            (ok true)
        )
    )
)

;; Removing Duplicates
(define-private (remove-duplicate (address principal))
    (not (is-eq address (unwrap-panic (var-get add-to-remove))))
)

;; Adding beneficiaries and removing duplicates
(define-public (add-beneficiary (beneficiant principal))
    (begin
        (asserts! (< (len (var-get beneficiaries)) u10) (err (var-get beneficiaries)))
        (var-set add-to-remove (some beneficiant))
        (var-set beneficiaries (filter remove-duplicate (var-get beneficiaries)))
        (var-set beneficiaries (unwrap-panic (as-max-len? (append (var-get beneficiaries) beneficiant) u10)))
        (ok (var-get beneficiaries))
    )
)