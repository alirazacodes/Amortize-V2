
;; btc-lock
;; <for locking crypto inside the equity>

;; Owner
(define-constant contract-owner tx-sender)

;; Errors
(define-constant err-owner-only (err u100))
(define-constant err-already-locked (err u101))
(define-constant err-unlock-in-past (err u102))
(define-constant err-no-value (err u103))
(define-constant err-beneficiary-only (err u104))
(define-constant err-unlock-time-not-reached (err u105))

;; for locking by beneficiary
;; (define-map equities
;;     ;; ERR: Public Data, as all maps are public
;;     {tx-id: (buff 64)}
;;     {beneficiary: principal, unlock-time: uint, amount: uint}
;; )
;; Data-variables
(define-data-var beneficiary (optional principal) none)
(define-data-var unlock-time uint u0)
;; (define-data-var share uint u0)
;; (define-data-var total-balance uint u0)

;; Locking STX for new beneficiaries
(define-public (lock (new-beneficiary principal) (unlock-at uint) (amount uint))
    (begin
        ;; (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        ;; (asserts! (is-none (var-get beneficiary)) err-already-locked)
        (asserts! (> unlock-at (unwrap-panic (get-block-info? time (- block-height u1)))) err-unlock-in-past)
        (asserts! (> amount u0) err-no-value)
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        (var-set beneficiary (some new-beneficiary))
        (var-set unlock-time unlock-at)
        (ok true)
    )
)

;; lending STX to new beneficiaries
(define-public (bestow (new-beneficiary principal))
    (begin
        (asserts! (is-eq (some tx-sender) (var-get beneficiary)) err-beneficiary-only)
        (var-set beneficiary (some new-beneficiary))
        (ok true)
    )
)

;; Claiming STX from multiple beneficiaries
(define-public (claim (id uint) (agent principal))
    (begin
        (asserts! (is-eq (some tx-sender) (var-get beneficiary)) err-beneficiary-only)
        (asserts! (>= (unwrap-panic (get-block-info? time (- block-height u1))) (var-get unlock-time)) err-unlock-time-not-reached)
        ;; (try! (contract-call? 'ST2C20XGZBAYFZ1NYNHT1J6MGMM0EW9X7PFZZEXA6.A-nft-minting-V5 transfer-ownership id agent))
        (as-contract (stx-transfer? (stx-get-balance tx-sender) tx-sender (unwrap-panic (var-get beneficiary))))
        
    )
)

;; (define-private (distribute (beneficier principal))
;;     (begin
;;         (try! (as-contract (stx-transfer? (var-get share) tx-sender beneficier)))
;;         (ok true)
;;     )
;; )

;; (define-private (filter-last-beneficier (beneficier principal))
;;     (not (is-eq (element-at beneficiaries (- (len beneficiaries) u1)) beneficier))
;; )

;; (define-public (multi-claim (beneficiaries (list 10 principal)))
;;     (begin
;;         (try! (as-contract (contract-call? .btc-lock claim)))
;;         (let
;;             (

;;                 (total-balance (as-contract (stx-get-balance tx-sender)))
;;                 (var-set share (/ total-balance (len beneficiaries)))
;;             )
;;             (filter distribute beneficiaries)
;;             (try! (as-contract (stx-transfer? (stx-get-balance tx-sender) tx-sender (element-at beneficiaries (- (len beneficiaries) u1)))))
;;             (ok true)
;;         )
;;     )
;; )

