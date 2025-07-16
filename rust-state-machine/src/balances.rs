use std::collections::BTreeMap;

type AccountId = String;
type Balance = u128;
#[derive(Debug)]
pub struct Pallet {
	balances: BTreeMap<AccountId, Balance>,
}

impl Pallet {
	pub fn new() -> Self {
		Self { balances: BTreeMap::new() }
	}

	/// Set the balance of an account `who` to some `amount`.
	pub fn set_balance(&mut self, who: &String, amount: u128) {
		/* Insert `amount` into the BTreeMap under `who`. */
		self.balances.insert(who.clone(), amount);
	}

	/// Get the balance of an account `who`.
	/// If the account has no stored balance, we return zero.
	pub fn balance(&self, who: &String) -> u128 {
		/* Return the balance of `who`, returning zero if `None`. */
		*self.balances.get(who).unwrap_or(&0)
	}

	pub fn transfer(
		&mut self,
		caller: String,
		to: String,
		amount: u128,
	) -> Result<(), &'static str> {
		/* TODO:
			- Get the balance of account `caller`.
			- Get the balance of account `to`.

			- Use safe math to calculate a `new_caller_balance`.
			- Use safe math to calculate a `new_to_balance`.

			- Insert the new balance of `caller`.
			- Insert the new balance of `to`.
		*/
		let caller_balance = self.balance(&caller);
		if caller_balance < amount {
			return Err("Insufficient balance");
		}
		let to_balance = self.balance(&to);
		let new_caller_balance = caller_balance - amount;
		let new_to_balance = to_balance + amount;

		self.set_balance(&caller, new_caller_balance);
		self.set_balance(&to, new_to_balance);

		Ok(())
	}
}

#[test]
fn init_balances() {
	let mut balances = Pallet::new();
	assert_eq!(balances.balance(&"alice".to_string()), 0);
	balances.set_balance(&"alice".to_string(), 100);
	assert_eq!(balances.balance(&"alice".to_string()), 100);
	assert_eq!(balances.balance(&"bob".to_string()), 0);
	balances.transfer("alice".to_string(), "bob".to_string(), 50).unwrap();
}
