package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Klijent;
import rva.repository.KlijentRepository;

@RestController
public class KlijentRestController {
	
	@Autowired
	private KlijentRepository klijentRepository;
	
	
	@GetMapping("klijent")
	public Collection<Klijent> getKlijenti() {
		return klijentRepository.findAll();
	}
	
	@GetMapping("klijent/{id}")
	public Klijent getKlijent(@PathVariable("id") Integer id) {
		return klijentRepository.getOne(id);
	}
	
	@GetMapping("klijentIme/{ime}")
	public Collection<Klijent> getKlijentByIme(@PathVariable("ime") String ime){
		return klijentRepository.findByImeContainingIgnoreCase(ime);
	}

}
